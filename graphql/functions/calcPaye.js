Query(
  Lambda(
    "taxableSalary",
    If(
      LTE(Var("taxableSalary"), 24000),
      { data: [0] },
      Map(
        Paginate(Match(Index("taxes_by_name"), "PAYE")),
        Lambda(
          "tax",
          Let(
            {
              taxDoc: Get(Var("tax")),
              bracket: Select(["data", "bracket"], Var("taxDoc")),
              rates: Select(["data", "tax"], Var("taxDoc")),
              computed: Select(["data", "computed"], Var("taxDoc")),
              relief: Select(["data", "relief"], Var("taxDoc")),
              filteredBracket: Filter(
                Var("bracket"),
                Lambda("brack", GT(Var("taxableSalary"), Var("brack")))
              ),
              filteredBracketCount: Count(Var("filteredBracket")),
              lastRate: Select(Var("filteredBracketCount"), Var("rates")),
              excess: Subtract(
                Var("taxableSalary"),
                Select(Subtract(Var("filteredBracketCount"), 1), Var("bracket"))
              ),
              excessTax: Multiply(Var("excess"), Var("lastRate")),
              actualComputed: Take(
                Var("filteredBracketCount"),
                Var("computed")
              ),
              actualComputedTax: Reduce(
                Lambda(["acc", "val"], Add(Var("acc"), Var("val"))),
                0,
                Var("actualComputed")
              ),
              result: Round(
                Subtract(
                  Add(Var("excessTax"), Var("actualComputedTax")),
                  Var("relief")
                )
              )
            },
            If(LTE(Var("result"), 0), { data: [0] }, Var("result"))
          )
        )
      )
    )
  )
)