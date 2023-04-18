import { IDeserializable } from "src/app/shared/models/deserializable.model";

export class RegisterRequest implements IDeserializable {
    
    name: string;
    email: string;
    password: string;

    public deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
    
}