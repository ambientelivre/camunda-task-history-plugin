import { Pipe, PipeTransform } from "@angular/core";
import { orderBy } from "lodash";

@Pipe({
  name: "customSort",
})
export class SortPipe implements PipeTransform {
  transform<T extends any[]>(data: T, id: string, sortBy: "asc" | "desc"): T {
    return orderBy(data, [id], sortBy) as T;
  }
}
