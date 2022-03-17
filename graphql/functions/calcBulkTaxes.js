Query(
  Lambda(
    "bulkList",
    Map(
      Var("bulkList"),
      Lambda(
        "item",
        Let(
          {
            id: Select("id", Var("item")),
            grossSalary: Select("grossSalary", Var("item"))
          },
          {
            id: Var("id"),
            taxes: Call(Function("calcTaxes"), Var("grossSalary"))
          }
        )
      )
    )
  )
)