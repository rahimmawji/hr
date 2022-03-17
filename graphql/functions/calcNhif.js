Query(
  Lambda(
    "salary",
    Map(
      Paginate(Match(Index("taxes_by_name"), "NHIF")),
      Lambda(
        "tax",
        Let(
          {
            taxDoc: Get(Var("tax")),
            brackets: Select(["data", "bracket"], Var("taxDoc")),
            taxes: Select(["data", "tax"], Var("taxDoc")),
            filteredBrackets: Filter(
              Var("brackets"),
              Lambda("brack", GT(Var("salary"), Var("brack")))
            ),
            arrayIndex: Count(Var("filteredBrackets"))
          },
          Select(Var("arrayIndex"), Var("taxes"))
        )
      )
    )
  )
)