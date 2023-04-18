import { IDeserializable } from "src/app/shared/models/deserializable.model";

export class EmailExistResponse implements IDeserializable {
    
    emailExist: boolean;

    public deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
    
}