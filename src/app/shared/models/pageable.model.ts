import { IDeserializable } from "./deserializable.model";
import { PageableSort } from "./pageable-sort.model";

export class Pageable implements IDeserializable {
    sort: PageableSort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;

    public deserialize(input: any): this {
        Object.assign(this, input);
        this.sort = new PageableSort().deserialize(input.sort);
        return this;
    }
}