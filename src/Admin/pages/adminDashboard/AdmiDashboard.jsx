import React, { useEffect, useState } from 'react'
import QuickAccess from './QuickAccess'
import ExamParticipation from './ExamParticipation'
import UserGrowthGraph from './UserGrowthGraph'
import axios from 'axios'

const AdmiDashboard = () => {

  const [UserGrowthGraphData, setUserGrowthGraphData] = useState([])
  const [examPariticipationData, setExamParticipationData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchGraphData = async () => {

    try {
      setLoading(true)

      const response = await axios.get(`/api/v1/admin/dashboard/graph-data`)

      setUserGrowthGraphData(response?.data?.data?.filteredData)
      setExamParticipationData(response?.data?.data?.examParticipationData)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {

    fetchGraphData()

  }, [])
  return (
    <div className='bg-white min-h-screen w-[79%] rounded-md p-10 '>
      <QuickAccess />
      <div className='grid grid-cols-2 gap-5  mt-20'>

        <UserGrowthGraph data={UserGrowthGraphData} />
        <ExamParticipation data={examPariticipationData} />
      </div>
    </div>
  )
}

export default AdmiDashboard
