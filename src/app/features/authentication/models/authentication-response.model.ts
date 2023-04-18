import { IDeserializable } from "src/app/shared/models/deserializable.model";

export class AuthenticationResponse implements IDeserializable {
    
    token: string;

    public deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
    
}