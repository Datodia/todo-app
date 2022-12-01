import styled from 'styled-components'
import { Props } from '../../Interface'

export default function Header({ dark, setDark }: Props) {

    const handleClick = () => {
        setDark(!dark)
    }

    return (
        <Wrapper>
            <Logo src='assets/svg/TODO.svg' />
            <Button onClick={handleClick}>{dark ? <Img dark={dark} src='assets/svg/icon-sun.svg' /> : <Img dark={dark} src='assets/svg/icon-moon.svg' />}</Button>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    width: 320px;
    margin: auto;
    padding-top: 40px;
    display: flex;
    justify-content: space-between;
    @media screen and (min-width: 768px) {
        width: 540px;
        padding-top: 70px;
    }
`
const Button = styled.button`
    background: none;
    border: none;
`

const Img = styled.img<Props>`
    transform: rotate(${props => props.dark ? "360deg" : "0deg"});
    transition: all .5s;
    @media screen and (min-width: 768px) {
        height: 30px;
    }
`
const Logo = styled.img`
    @media screen and (min-width: 768px) {
        height: 30px;
    }
`
