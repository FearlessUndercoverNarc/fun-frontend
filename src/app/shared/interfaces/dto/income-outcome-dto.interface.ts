import { IncomeMoneyOperation } from "../money-operations/income-money-operation.interface";
import { OutcomeMoneyOperation } from "../money-operations/outcome-money-operation.interface";

export interface IncomeOutcomeDto {
    outcoming: OutcomeMoneyOperation[]
    incoming: IncomeMoneyOperation[]
}
