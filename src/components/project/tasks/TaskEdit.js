import { useState, useEffect } from 'react';
import SaveIcon from '../../../images/project/tasks/save.svg';
import AssingIcon from '../../../images/project/tasks/ppladd.svg';
import PersonIcon from '../../../images/project/tasks/person.svg';
import PlusIcon from '../../../images/project/plus.svg';
import XIcon from '../../../images/x.svg';
import { db, fb, functions } from '../../../firebase';

import useAuth from '../../../hooks/useAuth';
import useError from '../../../hooks/useError';

import { Group, FlexContainer, ImageContainer, SmallButton, SaveButton, SecondGroup, SelectMenu, GridList, MemberContainer, MemberButton, CloseButton } from "../Main.styles";

const TaskEdit = ({setLoading, performer, members: membersIDs, title, description, taskID, isOwner, creating, id, setIsEditing}) => {

    const [selectedPerformer, setSelectedPerformer] = useState();
    const [isSelectingPerformer, setIsSelectingPerformer] = useState(false);
    const [members, setMembers] = useState([]);
    const { currentUser } = useAuth();
    const { dispatchError } = useError();

    const toggleOnSelectingPerformer = e => {
        e.preventDefault();
        if(!isOwner) return;
        setIsSelectingPerformer(true);
    }

    const handleSelectPerformer = (e, performer) => {
        e.preventDefault();
        if(!isOwner) return;
        setSelectedPerformer(performer);
        setIsSelectingPerformer(false);
    }

    const handleCloseSelecting = e => {
        e.preventDefault();
        setIsSelectingPerformer(false);
    }

    const createUpdateTask = async e => {
        e.preventDefault();
        dispatchError({type: 'reset'});
        if(!isOwner) return;
        const form = e.target;
        const { value:newTitle } = form.elements['title'];
        const { value:newDescription } = form.elements['description'];
        if(newTitle.trim().length > 20) return dispatchError({type: 'projects/task-title-too-long'});
        if(newTitle.trim().length < 6) return dispatchError({type: 'projects/task-title-too-short'});
        if(newDescription.trim().length > 300) return dispatchError({type: 'projects/task-description-too-long'});
        if(newDescription.trim().length < 6) return dispatchError({type: 'projects/task-description-too-short'});
        if(!selectedPerformer) return dispatchError();
        if(creating){
            try{
                setIsEditing(false);
                await db.collection('tasks').add({
                    performer: selectedPerformer,
                    createdAt: fb.firestore.FieldValue.serverTimestamp(),
                    projectID: id,
                    status: 'pending',
                    title: newTitle.trim(),
                    description: newDescription.trim()
                });
                dispatchError({type: 'reset'});
            }
            catch(error){
                dispatchError({type: 'projects/task-create'})
            }
        }
        else{
            try{
                setIsEditing(false);
                await db.collection('tasks').doc(taskID).update({
                    performer: selectedPerformer,
                    title: newTitle.trim(),
                    description: newDescription.trim()
                });
                dispatchError({type: 'reset'});
            }
            catch(error){
                dispatchError({type: 'projects/task-update'})
            }
        }
    }

    useEffect(() => {
        if(creating){
            setSelectedPerformer({
                displayName: currentUser.displayName,
                uid: currentUser.uid,
                photoURL: currentUser.photoURL
            });
        }
        else{
            setSelectedPerformer(performer);
        }
    }, [creating, performer, currentUser]);

    useEffect(() => {
        const getUsersData = functions.httpsCallable('getUsersData');
        const getData = async () => {
            try{
                setLoading(true);
                const { data } = await getUsersData({uids: membersIDs});
                setMembers(data);
                setLoading(false);
            }
            catch(error){
                console.error(error);
            }
        }
        getData();
    }, [membersIDs, setLoading])

    return(
        <form onSubmit={createUpdateTask} noValidate>
            {isSelectingPerformer ? (
                <SelectMenu>
                    <CloseButton onClick={handleCloseSelecting} type='button'>
                        <img src={XIcon} alt='Close' />
                    </CloseButton>
                    <img src={PersonIcon} alt='Person' />
                    <h2>SET TASK PERFORMER</h2>
                    <GridList>
                        {members.map(({photoURL, displayName, uid}) => (
                            <MemberContainer key={uid}>
                                <div>
                                    <img src={photoURL} alt={displayName} />
                                    <p>{displayName}</p>
                                </div>
                                <MemberButton onClick={e => handleSelectPerformer(e, {photoURL, displayName, uid})} type='button'>
                                    <img src={PlusIcon} alt='Assign' />
                                </MemberButton>
                            </MemberContainer>
                        ))}
                    </GridList>
                </SelectMenu>
            ) : (
                <>
                    <Group>
                        <div>
                            <ImageContainer>
                                <img src={selectedPerformer && selectedPerformer.photoURL} alt='Performer' />
                            </ImageContainer>
                            <h2>{selectedPerformer && selectedPerformer.displayName}</h2>
                        </div>
                        <div>
                            <FlexContainer>
                                <SmallButton onClick={toggleOnSelectingPerformer} type='button'>
                                    <img src={AssingIcon} alt='Assing' />
                                </SmallButton>
                            </FlexContainer>
                            <FlexContainer>
                                <SaveButton type='submit'>
                                    <img src={SaveIcon} alt='Submit' />
                                    Save
                                </SaveButton>
                            </FlexContainer>
                        </div>
                    </Group>
                    <hr />
                    <SecondGroup>
                        <label>
                            Task Title: 
                            <input defaultValue={title} type='text' name='title'/>
                        </label>
                        <label>
                            Description:
                            <textarea defaultValue={description} name='description' /> 
                        </label>
                    </SecondGroup>
                </>
            )}
        </form>
    )
}

export default TaskEdit;