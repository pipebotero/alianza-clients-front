import { IDeserializable } from "./deserializable.model";
import { PageableSort } from "./pageable-sort.model";
import { Pageable } from "./pageable.model";

export class PageableResponse implements IDeserializable {
    content: any[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: PageableSort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;

    public deserialize(input: any): this {
        Object.assign(this, input);
        this.pageable = new Pageable().deserialize(input.sort);
        this.sort = new PageableSort().deserialize(input.sort);
        return this;
    }
}