import { useContext } from 'react';
import { Context } from './../../context';

import './Sidebar.scss';

import Folder from './../Folder';
import AddFolder from './../AddFolder';

const Sidebar = () => {
    const {
        folders,
        removeFolder,
        activeFolder,
        selectActiveFolder
    } = useContext(Context);

    return (
        <aside className="sidebar">

            {folders && folders.length > 0 &&
                <Folder
                    title="Все задачи"
                    icon="icon-th-list"
                    active={!activeFolder}
                    onClick={() => selectActiveFolder(null)}
                />
            }
            {folders && folders.length > 0 ?
                folders ?
                <ul className="folder-list">
                    {
                        folders.map(folder => {
                            return <li className="folder-list__item" key={folder.id}>
                                <Folder
                                    title={folder.title}
                                    hex={folder.color.hex}
                                    active={activeFolder && activeFolder.id === folder.id}
                                    onClick={() => selectActiveFolder(folder.id)}
                                    length={String(folder.tasks.length)}
                                />
                                <button
                                    className="folder-list__remove-btn"
                                    onClick={() => removeFolder(folder.id)}
                                >
                                    <span className="icon-close"></span>
                                </button>
                            </li>
                        })
                    }
                </ul>
                :
                <div>Загрузка...</div>
                :
                null
            }


            <AddFolder />

        </aside >
    )
}

export default Sidebar;


// <div className="icon-plus1"></div>
// <div className="icon-th-list"></div>
// <div className="icon-check"></div>
// <div className="icon-close"></div>
// <div className="icon-edit"></div> 