Query(
  Lambda(
    "grossSalary",
    Let(
      {
        nssf: Call(Function("calcNssf"), Var("grossSalary")),
        nhif: Call(Function("calcNhif"), Var("grossSalary")),
        taxableSalary: Subtract(Var("grossSalary"), Var("nssf")),
        paye: Call(Function("calcPaye"), Var("taxableSalary")),
        nhifRelief: Multiply(Select(["data", 0], Var("nhif")), 0.15),
        payeLessNhifRelief: Subtract(
          Select(["data", 0], Var("paye")),
          Var("nhifRelief")
        )
      },
      {
        taxableSalary: Var("taxableSalary"),
        paye: If(
          LTE(Var("payeLessNhifRelief"), 0),
          0,
          Var("payeLessNhifRelief")
        ),
        nhif: Select(["data", 0], Var("nhif")),
        nssf: Var("nssf")
      }
    )
  )
)