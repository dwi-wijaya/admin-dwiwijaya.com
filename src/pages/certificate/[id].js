import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/Container'
import DetailCertificate from '@/components/views/certificate/DetailCertificate'
import getDocument from '@/services/firebase/crud/getDocument'
import { getDoc } from 'firebase/firestore'
import React from 'react'

const view = ({ data }) => {
  return (
    <Container>
      <PageHeading title="View Certificate">
      </PageHeading>
      <DetailCertificate data={data} />
    </Container>
  )
}

export default view
export const getServerSideProps = async ({ params }) => {
  const {result:data} = await getDocument("certificates", params?.id, true, 'image')
  return { props: { data } }
}