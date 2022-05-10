import './Badge.scss';

const Badge = ({ hex, size, active, onClick }) => {

    return (
        <div
            className={`badge badge_${size} ${active && 'badge_active'}`}
            style={{ 'backgroundColor': hex }}
            onClick={onClick}
        >
        </div>
    )
}

export default Badge;