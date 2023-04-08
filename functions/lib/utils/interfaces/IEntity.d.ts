export declare abstract class IEntity {
    uuid: string;
    protected created_date: Date;
    protected updated_date: Date;
    constructor();
    getCreatedDate(): Date;
    getUpdatedDate(): Date;
}
