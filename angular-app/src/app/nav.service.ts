import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NavService {
  activeId: number;

  select(id: number) {
    this.activeId = id;
  }
  constructor() {}
}
