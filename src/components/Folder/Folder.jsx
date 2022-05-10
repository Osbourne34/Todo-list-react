import './Folder.scss';

import Badge from './../Badge';

const Folder = ({ title, icon, hex, active, onClick, length }) => {
    return (
        <div
            className={`folder ${active ? 'folder_active' : ''}`}
            onClick={onClick}
        >
            {icon ?
                <span className={icon}></span>
                :
                <Badge hex={hex} size="small" />
            }
            <div className="folder__title">
                {title} {length && `(${length})`}
            </div>
        </div>
    )
}

export default Folder;