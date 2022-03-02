import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.section`
    margin: 20px;
    @media(min-width:900px){
        margin: 80px 30px 20px 0;
    }
`;

export const SubContainer = styled.div`
    max-width:1250px;
    width:100%;
    display:grid;
    grid-template-columns: 1fr;
    gap:30px;
    grid-template-areas:
    'banner'
    'aside'
    'main';
    @media(min-width:1300px){
        grid-template-columns: 1fr 3fr;
        grid-template-areas:
        'banner banner'
        'aside main';
    }
`

export const Form = styled.form`
    grid-area:banner;
`;

export const BannerContainer = styled.header`
    background: ${({background}) => background ? `url(${background})` : 'var(--colorSecondary)'};
    background-size:cover;
    background-position: center center;
    padding: 40px 0px 0px;
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 43px 43px 13px 13px;
    @media(min-width:700px){
        padding: 120px 0px 20px;
    }
`;

export const MainContainer = styled.section`
    grid-area: main;
    @media(min-width:1375px){
        margin-left:30px;
    }
`;

export const FlexContainer = styled.div`
    display:flex;
    justify-content:space-between;
    flex-direction:column;
    align-items:end;
    gap:10px;
    div:nth-child(1){
        padding: 0px 25px 0px 25px;
        width:100%;
    }
    div:nth-child(2){
        padding: 0px 25px 0px 25px;
        display:flex;
        margin-bottom:1.2rem;
    }

    div:nth-child(2):empty{
        margin-bottom:2.4rem;
    }

    @media(min-width:700px){
        flex-direction:row;
        gap:40px;
    }

    @media(min-width:1300px){
        div:nth-child(1){
            padding: 0px 0px 0px 100px;
        }
        div:nth-child(2){
            padding: 0px 100px 0px 0px;
        }
    }
`;

export const Title = styled.input`
    overflow-wrap: break-word;
    width:100%;
    display:block;
    background:none;
    border:none;
    color:var(--colorWhite);
    font-weight:700;
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    &:focus{
        outline:none;
    }
`;

export const Description = styled.textarea`
    overflow-wrap:break-word;
    resize:none;
    height:max-content;
    margin-top:10px;
    font-size: clamp(.8rem, 2vw, 1.3rem);
    width:100%;
    display:block;
    background:none;
    border:none;
    color:var(--colorWhite);
    font-weight:700;
    &:focus{
        outline:none;
    }
`;

export const InputFile = styled.input`
    display:none;
`;

export const Button = styled.button`
    background:none;
    border:none;
    margin-right:6px;
    padding:7px;
    cursor:pointer;
    img{
        width:29px;
        height:29px;
    }
`;

export const Label = styled.label`
    padding:7px;
    display:block;
    cursor:pointer;
`;

export const AsideContainer = styled.aside`
    grid-area: aside;
    background:var(--colorWhite);
    box-shadow: 0px 3px 6px #00000066;
    padding: 30px 0;
    border-radius:13px;
    display:flex;
    gap:20px;
    flex-direction:column;
    align-items:center;
    height:max-content;
    @media(min-width:${({isOwner}) => isOwner ? '370px' : '300px'}){
        justify-content:center;
        flex-direction:row;
    }
    @media(min-width:1300px){
        flex-direction:column;
        gap:${({isOwner}) => isOwner ? '50px' : '120px'};
        padding:0 8px;
    }
`;

export const DateContainer = styled.div`
    text-align:center;
    color:var(--darkerSecondary);
    width:100%;
    h2{
        margin-top:2px;
    }
    p{
        margin-top:4px;
    }
    input{
        margin-top:4px;
    }
    @media(min-width:1300px){
        margin-top:60px;
    }
`;

export const SecondContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:15px;
    width:100%;
    text-align:center;
    @media(min-width:1300px){
        margin-bottom:160px;
        gap:35px;
    }
`;

export const DeleteButton = styled.button`
    box-shadow: 0px 3px 6px #00000029;
    background: #DB382C;
    border:none;
    border-radius: 10px;
    color:var(--colorWhite);
    padding: 8px 0;
    font-size:.8rem;
    box-shadow: 0px 3px 6px #00000029;
    max-width:9rem;
    width:100%;
    cursor:pointer;
    transition:transform .2s ease;
    
    &:active{
        transform:scale(0.97);
    }
`;

export const PeopleAssignedButton = styled(Link)`
    text-decoration:none;
    cursor:pointer;
    background: var(--colorSecondary);
    box-shadow: 0px 3px 6px #0000005E;
    border:none;
    border-radius:13px;
    color:var(--colorWhite);
    font-weight:500;
    max-width:110px;
    width:100%;
    max-height:110px;
    font-size:.6rem;
    text-transform:uppercase;
    padding:25px 25px;
    transition:transform .2s ease;
    
    &:active{
        transform:scale(0.97);
    }
    img{
        display:inline
    }
    p{
        margin-top:5px;
    }

    ${({isOwner}) => (
        isOwner && (
            `@media(max-width:1300px){
                text-transform:none;
                padding: 8px 0;
                max-width:9rem;
                font-size:.8rem;
                border-radius:10px;
                p{
                    margin-top:0px;
                }
                img{
                    display:none;
                }
            }`
        )     
    )}
`;