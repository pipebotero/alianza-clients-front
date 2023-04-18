import { IDeserializable } from "src/app/shared/models/deserializable.model";

export class AuthenticationRequest implements IDeserializable {
    
    username: string;
    password: string;

    public deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
    
}