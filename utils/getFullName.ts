export type FullName = {
    first_name: string;
    middle_name: string;
    last_name: string;
};
export const getFullName = <TUser extends FullName>(user: TUser) => {
    const { first_name, middle_name, last_name } = user;
    if (!middle_name) return `${first_name} ${last_name}`;
    return `${first_name} ${middle_name} ${last_name}`;
};
