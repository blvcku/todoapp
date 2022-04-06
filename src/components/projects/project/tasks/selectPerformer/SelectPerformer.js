import PerformerIcon from '../../../../../images/performer.svg';
import PlusIcon from '../../../../../images/plus.svg';
import CloseIcon from '../../../../../images/close.svg';

import { Container, CloseButton, Wrapper } from "./SelectPerformer.styles";
import { MemberContainer, MemberButton } from "../../membersList/Members.styles";

const SelectPerformer = ({members, setSelectedPerformer, setIsSelectingPerformer}) => {

    const handleSelectPerformer = (e, performer) => {
        e.preventDefault();
        setSelectedPerformer(performer);
        setIsSelectingPerformer(false);
    }

    const handleCloseSelecting = e => {
        e.preventDefault();
        setIsSelectingPerformer(false);
    }

    return(
        <Container>
            <CloseButton onClick={handleCloseSelecting} type='button'>
                <img src={CloseIcon} alt='Close' />
            </CloseButton>
            <img src={PerformerIcon} alt='Performer' />
            <h2>SET TASK PERFORMER</h2>
                <Wrapper>
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
                </Wrapper>
        </Container>
    )
}

export default SelectPerformer;