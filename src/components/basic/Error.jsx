const Error = ({ error, setError }) => {
    setTimeout(() =>
        setError(''), 10000)
    return (
        <div>
            <p>{error}</p>
        </div>
    )
}

export default Error