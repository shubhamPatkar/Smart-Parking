import { fireEvent } from "@testing-library/react";

export const inputOnChange = (input,value)=>
    fireEvent.change(input,{
        target:{value}
    });
