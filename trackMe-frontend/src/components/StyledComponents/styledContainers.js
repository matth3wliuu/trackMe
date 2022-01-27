import styled from 'styled-components';

export const GeneralContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 49.5%;
    padding: 0.75rem;
    margin-top: 0.5rem;
    min-height: 65vh;
`;

export const ActionsContainer = styled.div`
    margin-top: 0.75rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
`;