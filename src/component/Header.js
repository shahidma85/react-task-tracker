import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({ title, toggleAdd, displayAdd }) => {

    return (
        <header className="header">
            <h1>{title}</h1>
            <Button
                color={displayAdd ? 'red' : 'green'}
                text={displayAdd ? 'Cancel' : 'Add'}
                onClick={toggleAdd} />
        </header>
    )


}
Header.defaultProps = {
    title: "Task Tracker"
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header;