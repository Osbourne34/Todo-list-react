import React, { useContext } from 'react';
import { Context } from './../../context';

import './Tasks.scss';

import TaskWrapper from './../TaskWrapper';

const Tasks = () => {
    const { activeFolder, folders } = useContext(Context);

    return (
        <div className="tasks">
            {!activeFolder
                ?
                folders && folders.map(folder => {
                    return <TaskWrapper
                        key={folder.id}
                        title={folder.title}
                        hex={folder.color.hex}
                        tasks={folder.tasks}
                        folderId={folder.id}
                    />
                })
                :
                <TaskWrapper
                    title={activeFolder.title}
                    hex={activeFolder.color.hex}
                    tasks={activeFolder.tasks}
                    folderId={activeFolder.id}
                />
            }
        </div>
    )
}

export default Tasks;