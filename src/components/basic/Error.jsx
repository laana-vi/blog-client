import { StyledError } from "../styled/ErrorStyled"

const Error = ({ error }) => {
    return (
        <StyledError>
                <p className="error">{error}</p>
        </StyledError>

    )
}

export default Error