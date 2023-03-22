

const formInput = ( { label, ...otherProps } ) => {
    //console.log(otherProps);
    return (
        <div>
            <label>{label}</label>
            <input {...otherProps} />
        </div>
    )

}

export default formInput;