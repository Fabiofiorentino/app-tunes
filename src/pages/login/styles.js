import styled from "styled-components";

export const Container = styled.div`

    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
        margin-bottom: -100px;
    }

    .page-login {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    
    .input-div {
        width: 300px;
        height: 200px;
        padding: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        input {
            width: 100%;
            margin: 10px 0;
            padding: 5px;
        }

        button {
            width: 100%;
            margin: 10px 0;
            background: blue;
            color: white;
            border-radius: 5px;
            padding: 5px;
        }
    }
`;

