import { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { db } from '../../../firebase';
import PauseIcon from '../../../images/pause.svg';
import UnpauseIcon from '../../../images/unpause.svg';
import CopyIcon from '../../../images/copy.svg';

import useAuth from '../../../hooks/useAuth';
import useError from '../../../hooks/useError';

import { Container, Wrapper, Header, PauseButton, FormInfoContainer, FormInfoWrapper, CopyButton, FormInfoFirst, FormInfoSecond, CopyContainer, QuestionsList } from './FormPanel.styles';
import FormScore from './FormScore';
import Question from './Question';

const FormPanel = () => {

    const { id } = useParams();
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(true);
    const { currentUser: { uid } } = useAuth();
    const { dispatchError } = useError();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('forms').doc(id).onSnapshot(form => {
            setForm({...form.data(), id: form.id});
            setLoading(false);
        }, error => setLoading(false));

        return unsubscribe;
    }, [id]);

    useEffect(() => {
        const unsubscribe = db.collection('forms').doc(id).collection('questions').orderBy('order').onSnapshot(questions => {
            const questionsList = [];
            questions.forEach(question => {
                questionsList.push({...question.data(), id: question.id});
            });
            setQuestions(questionsList);
        });
        return unsubscribe;
    }, [id]);

    useEffect(() => {
        if(uid !== form.authorID){
            setForm({});
        }
    }, [uid, form.authorID]);

    const handleTogglePaused = async e => {
        e.preventDefault();
        dispatchError({type: 'reset'});
        try{
            await db.collection('forms').doc(id).update({
                paused: !form.paused
            }); 
        }
        catch(error){
            dispatchError({type: 'forms/failed-to-pause'});
        }
    }

    const handleCopyLink = e => {
        e.preventDefault();
        navigator.clipboard.writeText(form.link);
    }

    const handleCopyQRCode = e => {
        e.preventDefault();
        navigator.clipboard.writeText(form.QRCode);
    }

    return(
        <>
            {!loading ? (
                form.title ? (
                    <Container>
                        <Wrapper>
                            <Header>
                                <h2>{form.title}</h2>
                            </Header>
                            <PauseButton onClick={handleTogglePaused} isPaused={form.paused} type='button'>
                                {form.paused ? (
                                    <>
                                        <img src={UnpauseIcon} alt='unpause' />
                                        <p>Unpause form</p>
                                    </>
                                ) : (
                                    <>
                                        <img src={PauseIcon} alt='pause' />
                                        <p>Pause form</p>
                                    </>
                                )}
                            </PauseButton>
                            <FormInfoContainer>
                                <FormInfoWrapper>
                                    <FormInfoFirst>
                                        <h3>Form Link:</h3>
                                        <CopyContainer style={{marginTop: '.4rem'}}>
                                            <a href={form.link}>{form.link}</a>
                                            <CopyButton onClick={handleCopyLink} type='button'>
                                                <img src={CopyIcon} alt='copy' />
                                            </CopyButton>
                                        </CopyContainer>   
                                    </FormInfoFirst>
                                    <FormInfoSecond>
                                        <CopyContainer>
                                            <h4>Scan QR Code</h4>
                                            <CopyButton onClick={handleCopyQRCode} type='button'>
                                                <img src={CopyIcon} alt='copy' />
                                            </CopyButton>
                                        </CopyContainer>
                                        <img src={form.QRCode} alt='QRCode' />
                                    </FormInfoSecond>
                                    <FormScore number={form.tookPart} text='Took part' />
                                    <FormScore number={form.inProgress} text='In Progress' />
                                </FormInfoWrapper>
                            </FormInfoContainer>
                            <QuestionsList>
                                {questions.map(({id: questionID, title, answers, inputField}) => (
                                    <Question key={questionID} title={title} formID={id} id={questionID} answers={answers} inputField={inputField} />
                                ))}
                            </QuestionsList>
                        </Wrapper>
                    </Container>
                ) : (
                    <Redirect to='/' />
                )
            ) : (
                null
            )}
        </>
    )
}

export default FormPanel;