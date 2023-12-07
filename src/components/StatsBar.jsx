import React from 'react'
import { HiChevronRight, HiChevronDown } from 'react-icons/hi'
import { useState } from 'react'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'


const StatsBar = ({onSelectCity}) => {
  const [stage1, toggleStage1] = useState(false)
  const [stage2, toggleStage2] = useState(false)

  const conditionalStyles1 = classNames("wrapper1", {"open": stage1==true, "": stage1==false})

  return (
    <div className='frosted-glass h-full text-white route-select pr-3 '>
        <div className='pt-3 text-zinc-400 flex flex-col'>
            <div className='inline-flex items-center pl-2 z-20'>
              <CSSTransition in={stage1} timeout={300} classNames="stage1chevron">
                <HiChevronRight size={22} className='stage1chevron'/>
              </CSSTransition>
            
              <button onClick={() => {toggleStage1(!stage1); console.log(stage1)}} className='text-xl font-bold text-white'>STAGE 1</button>
            </div>

            {/* <Stage1Cities /> */}
            <CSSTransition 
            in={stage1} 
            unmountOnExit 
            timeout={350}
            classNames="stage1menu"
            >
              <div className="expandable">
                
                <div className='inline-flex items-center pb-1 pt-1 pl-4 w-full hover-gray'>
                  {/* <HiChevronRight size={15} className=''/> */}
                  <button onClick={() => {onSelectCity({longitude: -94.41210259647566, latitude: 39.09358078384889})}}>
                    Segment 1: Independece
                  </button>
                </div>

                <div className='inline-flex items-center pb-1 pt-1 pl-4 w-full hover-gray'>
                  {/* <HiChevronRight size={15} className=''/> */}
                  <button onClick={() => {onSelectCity({longitude: -95.67524568097107, latitude: 39.04719713117554})}}>
                    Segment 2: Topeka
                  </button>
                </div>
              </div>
            </CSSTransition>
              

            <div className='inline-flex items-center pl-2 mt-2'>
              <CSSTransition in={stage2} timeout={300} classNames="stage2chevron">
                <HiChevronRight size={22} className='stage2chevron'/>
              </CSSTransition>
              {/* {stage2 && <HiChevronDown size={22} className=''/>} */}
            
              <button onClick={() => {toggleStage2(!stage2)}} className='text-xl font-bold text-white'>STAGE 2</button>
            </div>

            <CSSTransition 
            in={stage2} 
            unmountOnExit 
            timeout={350}
            classNames="stage2menu"
            >
              <div className='expandable'>
                <div className='inline-flex items-center pb-1 pt-1 pl-4 w-full hover-gray'>
                  {/* <HiChevronRight size={15} className=''/> */}
                  <button onClick={() => {onSelectCity({longitude: -98.34472828966797, latitude: 40.92543115724182})}}>
                    Segment 1: Grand Island
                  </button>
                </div>

                <div className='inline-flex items-center pb-1 pt-1 pl-4 w-full hover-gray'>
                  {/* <HiChevronRight size={15} className=''/> */}
                  <button onClick={() => {onSelectCity({longitude: -103.65786893756275, latitude: 41.82648536786615})}}>
                    Segment 2: Gering</button>
                </div>

                <div className='inline-flex items-center pb-1 pt-1 pl-4 w-full hover-gray'>
                  {/* <HiChevronRight size={15} className=''/> */}
                  <button onClick={() => {onSelectCity({longitude: -106.2972955901228, latitude: 42.84809308870818})}}>
                    Segment 3: Casper</button>
                </div>
              </div>
            </CSSTransition>
              

        </div>

    </div>
  )
}

export default StatsBar