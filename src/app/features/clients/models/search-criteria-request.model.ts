import { IDeserializable } from "src/app/shared/models/deserializable.model";

export class SearchCriteriaRequest implements IDeserializable {

    filterKey: string;
    operation: string;
    value: any;

    public deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}