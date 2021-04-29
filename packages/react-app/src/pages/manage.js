import React from 'react'
import { useState, useEffect, useContext } from 'react';

import { Context } from '@project/react-app/src/utils'

import { Container, Row, Col } from 'react-bootstrap/';
import { Grey, Blue, InputBox, ButtonBox, PrimaryButton, CircleQ, WorkerRunwayDisplay, DataRow, SecondaryButton, EthBalance, NuBalance, Spinner} from '@project/react-app/src/components'
import Breadcrumbs from '@project/react-app/src/components/breadcrumbs'

const ToggleButton = ({activeCheck, boolState, onClick, abort}) => {

    const handleAbort = () => {
        // puts the button back in cases where someone cancelled a transaction or something like that
        if (abort) {
            abort(false)
        }
    }

    return (
        <div className="d-flex justify-content-center">{ activeCheck ? <Spinner onClick={handleAbort}/> :
        <div>{
            boolState ?
            <PrimaryButton onClick={onClick} className="mt-2" width="100">On</PrimaryButton> :
            <SecondaryButton onClick={onClick} className="mt-2" width="100">Off</SecondaryButton>
        }</div>}</div>
    )
}

const PendingButton = (props) => {

    const handleAbort = () => {
        // puts the button back in cases where someone cancelled a transaction or something like that
        if (props.abort) {
            props.abort(false)
        }
    }

    return (
        <div className="d-flex justify-content-center">{ props.activeCheck ?
            <Spinner onClick={handleAbort}/> :
            <PrimaryButton {...props}>{props.children}</PrimaryButton>
        }</div>
    )
}



export function Manage() {

    const context = useContext(Context)
    const {account} = context.wallet
    const stakerData = context.stakerData
    const workerAddress = context.workerAddress.get
    const availableETH = context.availableETH.get
    const availableNU = context.availableNU.get
    const setAvailableETH = context.availableETH.set
    const setAvailableNU = context.availableNU.set



    // TODO:  clean this into a for loop
    const [windingdown, setWindingdown]  = useState(false)
    const [restaking, setRestaking] = useState(false)
    const [bondingworker, setBondingWorker]  = useState(false)
    const [addingsubstake, setAddingSubstake] = useState(false)

    const handleChangeWorker = () => {
        context.modals.triggerModal({message: "Bond Worker", component: "BondWorker"})
    }

    const handleChangeRestake = () => {
        context.modals.triggerModal({message: "Toggle Restake", component: "Restake"})
    }

    const handleChangeWindDown = () => {
        context.modals.triggerModal({message: "Toggle WindDown", component: "Winddown"})
    }

    const handleAddSubstake = () => {
        context.modals.triggerModal({message: "Add Substake", component: "CreateStake"})
    }

    useEffect(() => {
        setWindingdown(context.pending.indexOf('winddown') > -1)
        setRestaking(context.pending.indexOf('restake') > -1)
        setBondingWorker(context.pending.indexOf('bondingworker') > -1)
        setAddingSubstake(context.pending.indexOf('addsubstake') > -1)

    }, [context.pending.length, context.pending])


    return (
        <Container>
            <Row>
                <Breadcrumbs paths={[
                    {path:'/', label: 'root', enabled: true },
                    {path: '/manage', label: 'manage', enabled: true},
                ]}/>
            </Row>

            <Row>
                <Col className="d-flex justify-content-center mb-4 mt-2">
                    <h1>Manage Staked Nu</h1>
                </Col>
            </Row>

            <Row className="d-flex justify-content-center">
                <Col xl={6} >
                    <InputBox>
                        <Row>
                            <Col className="d-flex justify-content-center mb-4">
                                <h5>Rewards</h5>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="d-flex justify-content-around">
                                <Col>
                                <strong>Staking</strong>
                                <CircleQ tooltip="NU Rewards earned by committing to work for the network"/>
                                <PrimaryButton className="mt-2" width="100"><small>Withdraw</small>  <NuBalance balance={stakerData.availableNUWithdrawal}/></PrimaryButton>
                                </Col>

                                <Col>
                                <strong>Policy</strong>
                                <CircleQ tooltip="ETH rewards collected from policy fees"/>
                                <PrimaryButton className="mt-2" width="100"><small>Withdraw</small> {stakerData.availableETHWithdrawal} <Grey>ETH</Grey></PrimaryButton>
                                </Col>
                            </Col>
                        </Row>
                    </InputBox>
                    <InputBox className="mt-5 mb-5">
                        <Row>
                            <Col className="d-flex justify-content-center mb-4">
                                <h5>Settings</h5>
                            </Col>
                        </Row>
                        <Row>
                            {stakerData.flags ? <Col className="d-flex justify-content-around">
                                <Col>
                                    <strong>Re-Stake</strong>
                                    <CircleQ tooltip="Compound your staking returns by automatically re-staking each period's rewards."/>
                                    <ToggleButton abort={setRestaking} activeCheck={restaking} boolState={stakerData.flags.reStake} onClick={handleChangeRestake} />
                                </Col>
                                <Col>
                                    <strong>Wind Down</strong>
                                    <CircleQ tooltip="Each period commited will reduce stake length by one period."/>
                                    <ToggleButton abort={setWindingdown} activeCheck={windingdown} boolState={stakerData.flags.windDown} onClick={handleChangeWindDown} />
                                </Col>
                            </Col>: null}
                        </Row>
                    </InputBox>
                </Col>
                <Col xl={6}>
                    <InputBox>
                        <Row>
                            <Col className="d-flex justify-content-center mb-4">
                                <h5>Running</h5>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <div className="d-flex justify-content-between">
                                <Grey>Worker</Grey>
                                <PendingButton small activeCheck={bondingworker} onClick={handleChangeWorker} abort={setBondingWorker}>{workerAddress ? 'Change' : 'Set Worker'}</PendingButton>
                                </div>
                               <ButtonBox className="mb-3 mt-1">
                                   { workerAddress ?
                                   <div>
                                    <strong>{workerAddress}</strong>
                                    <WorkerRunwayDisplay address={workerAddress}/>
                                    <DataRow>
                                        <strong>Last Committed Period</strong><span><Blue>{stakerData.info.nextCommittedPeriod || stakerData.info.nextCommittedPeriod}</Blue></span>
                                        </DataRow>
                                    </div> : <p> no worker associated with account</p>}
                               </ButtonBox>

                               <div className="d-flex justify-content-between">
                                <Grey className="mb-3">Staker</Grey>
                               </div>
                               <ButtonBox className="mb-3">
                                   <strong>{account}</strong>
                                   <DataRow className="mt-3">
                                       <strong>ETH balance</strong><span><EthBalance balance={availableETH} onBalance={setAvailableETH}/></span>
                                    </DataRow>
                                    <DataRow>
                                       <strong>NU balance <small>(wallet)</small></strong><span><NuBalance balance={availableNU} onBalance={setAvailableNU}/></span>
                                    </DataRow>
                                    <DataRow>
                                       <strong>Total NU Locked</strong><span><NuBalance balance={stakerData.lockedNU}/></span>
                                    </DataRow>
                               </ButtonBox>
                               <div className="d-flex justify-content-between">
                                <Grey>Substakes</Grey>
                                <PendingButton small activeCheck={addingsubstake} onClick={handleAddSubstake} abort={setAddingSubstake}>Add Substake</PendingButton>
                                </div>
                               <ButtonBox className="mt-1">
                               {stakerData.substakes.length ?
                                    stakerData.substakes.map((st, index)=>{
                                        return(
                                        <div className="mt-3" key={index}>
                                            <DataRow>
                                                <strong>start: {st.firstPeriod}</strong>
                                                <strong>end: {st.lastPeriod}</strong>
                                                <span><NuBalance balance={st.lockedValue}/></span>
                                            </DataRow>
                                            <div className="d-flex justify-content-center">
                                            {parseInt(st.unlockingDuration) ? <div className="flex justify-content-around">
                                                <SecondaryButton className="mr-3" small>Prolong</SecondaryButton>
                                                <SecondaryButton className="mr-3" small>Divide</SecondaryButton>
                                            </div> : <Grey>unlocked</Grey>}
                                            </div>
                                        </div>
                                        )
                                    }) : null
                                }
                               </ButtonBox>
                            </Col>
                        </Row>
                    </InputBox>
                </Col>
                <Col>

                </Col>
            </Row>
        </Container>
    )
}