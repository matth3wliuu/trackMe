import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Divider } from '@mui/material';
import DashContext from '../../contexts/DashContext';
import api from '../../api/config';

const Container = styled.div`
    width: 96%;
    height: 350px;
    margin: auto;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0px 1px 5px #888888;
    padding: 1rem;
    transform: translateY(10%);
`;

const TermGrid = styled.div`
    width: 96%;
    height: 60%;
    display: grid;
    margin-top: 1.5rem;
    border: 1px solid black;
    position: absolute;
    border-radius: 6px;
    grid-template-columns: 75px repeat(15, calc( (100% - (75px) ) / 15 ));  
    grid-template-rows: repeat(5, calc( 100% / 5 ));
`;

const GridItem = styled.div.attrs(props => ({
    row: props.row,
    col: props.col
}))`
    grid-column: ${ props => props.col };
    grid-row: ${ props => props.row };
    display: flex;
    justify-content: flex-start;
    padding-left: 8px;
    align-items: center;
    border-left: ${ props => props.col === 1 ? 0 : 1}px solid black;
    border-bottom: ${ props => props.row === 5 ? 0 : 1}px solid black;
    background-color: ${ props => props.row > 1 && props.row % 2 == 0 ? "#F1F5F9" : "" };
    overflow: visible;
`;

const BaseCell = styled(GridItem)`
    justify-content: center;
    padding: 0px;
`;

const workTypes = [ "Type", "Class", "Marking", "Workshop", "Other" ];
const typeCells = workTypes.map( (workType, i) => {
    return (
        <GridItem 
            key = { `payment-grid-${ workType }` }
            row = { i + 1}
            col = { 1 }
        > 
            { i == 0 ? 
                <p style = { { fontSize: "0.8rem" } }> <b> { workType } </b> </p> : 
                <p style = { { fontSize: "0.8rem" } } > { workType } </p>
            }
            
        </GridItem>
    );
});

const weeks = ["H1", "H2", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, "H3", "H4"];
const weeksMap = {
    "H1": 2,
    "H2": 3,
    "H3": weeks.length, 
    "H4": weeks.length + 1
}
const weekCells = weeks.map( (week, idx) => {
    return (
        <BaseCell
            key = { `payment-grid-${ week }` }
            row = { 1 }
            col = { idx + 2 }
        >
            { <p style = { { fontSize: "0.8rem" } }> <b> { week } </b> </p> }
        </BaseCell> 
    );
});

const gridCells = workTypes.map( (_, i) => weeks.map( (_, j) => {
    return ( 
        i + 2 < 6 && 
        <BaseCell 
            key = { `payment-grid-${ i }-${ j }` }
            row = { i + 2 }
            col = { j + 2 }
        /> 
    );
}));

const TopBar = (props) => {
    return (
        <> 
            <p style = { { fontSize: "1.25rem" } } > <b> { props.name } </b> </p>
            <Divider sx = { { marginTop: "0.75rem" } }/>
        </>
    );
};




const PaymentContainer = (props) => {

    const term_id = "21t2";

    const { tutorProfile } = useContext(DashContext);
    const [termPayment, setTermPayment] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const classCells = termPayment && Object.keys(termPayment["class"]).map( function(k) {
        const col = k in weeksMap ? weeksMap[k] : parseInt(k) + 3;
        return (
            <BaseCell 
                key = { `payment-class-2-${col}` }
                row = { 2 }
                col = { col }
            > 
                <p style = { { fontSize: "0.8rem" } }> { termPayment["class"][k] } </p>
            </BaseCell>
        );
    });

    const markingCells = termPayment && Object.keys(termPayment["marking"]).map( function(k) {
        const col = k in weeksMap ? weeksMap[k] : parseInt(k) + 3;
        return (
            <BaseCell 
                key = { `payment-class-3-${col}` }
                row = { 3 }
                col = { col }
            > 
                <p style = { { fontSize: "0.8rem" } }> { termPayment["marking"][k] } </p>
            </BaseCell>
        );
    });

    const workshopCells = termPayment && Object.keys(termPayment["workshop"]).map( function(k) {
        const col = k in weeksMap ? weeksMap[k] : parseInt(k) + 3;
        return (
            <BaseCell 
                key = { `payment-class-4-${col}` }
                row = { 4 }
                col = { col }
            > 
                <p style = { { fontSize: "0.8rem" } }> { termPayment["workshop"][k] } </p>
            </BaseCell>
        );
    });

    const otherCells = termPayment && Object.keys(termPayment["other"]).map( function(k) {
        const col = k in weeksMap ? weeksMap[k] : parseInt(k) + 3;
        return (
            <BaseCell 
                key = { `payment-class-5-${col}` }
                row = { 5 }
                col = { col }
            > 
                <p style = { { fontSize: "0.8rem" } }> { termPayment["other"][k] } </p>
            </BaseCell>
        );
    });

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await api.get("/tutor/payment", {
                    params: { 
                        "term_id": term_id,
                        "tutor_id": tutorProfile[0]
                    },
                    signal: controller.signal
                });
                setTermPayment(res.data["term_data"]);
            }
            catch (err) {
                console.log(err.message);
            }
            finally {
                setIsLoading(false)
            };
        };
        fetchData();
        return () => controller.abort();
    }, [tutorProfile]);


    return (
        <Container>
            <TopBar name = { `${tutorProfile[1]} ${tutorProfile[2]}` } />
                <TermGrid> 
                    { typeCells } { weekCells } { gridCells }
                    { classCells } { markingCells } { workshopCells } { otherCells }
                </TermGrid>
        </Container> 
    );
};

export default PaymentContainer;
