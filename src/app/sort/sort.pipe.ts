import { Pipe, PipeTransform } from "@angular/core";
import { orderBy } from "lodash";

@Pipe({
  name: "customSort",
})
export class SortPipe implements PipeTransform {
  transform<T extends any[]>(data: T, id: string, orders: "asc" | "desc"): T {
    return orderBy(data, [id], orders) as T;
  }
}
