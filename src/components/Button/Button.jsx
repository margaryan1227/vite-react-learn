import styles from './Button.module.scss';

const Button = ({
    className = '',
    type = 'button',
    children,
    onClick,
    isDisabled,
}) => {
    return (
        <button
            className={`${styles.button} ${className}`}
            type={type}
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button