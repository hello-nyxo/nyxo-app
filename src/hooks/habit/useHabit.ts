import { useMutation, useQuery } from "react-query" 
	import { useSelector } from 'react-redux'
import { getAuthState } from '@selectors/auth-selectors/auth-selectors'
import { API, graphqlOperation } from 'aws-amplify'

const createHabit = ''


const deleteHabit = async (habitId: string) => { 
	try {
		API.graphql(
			graphqlOperation(deleteHabit, { input: { id: habitId } }))
	} catch (error) {
		return error
	}
} 




const useCreateHabit = () => {
	const isLoggedIn = useSelector(getAuthState)

	if(isLoggedIn) {
		return useMutation()
	}}

const useDeleteHabit = () => {
	const isLoggedIn = useSelector(getAuthState)

	if(isLoggedIn) {
		return useMutation(deleteHabit)
	}
}

const useEditHabit =() => {
	const isLoggedIn = useSelector(getAuthState)

	if(isLoggedIn) {
		return useMutation()
	}

}

const useGetHabit = () => {
	const isLoggedIn = useSelector(getAuthState)

	if(isLoggedIn) {
		return useQuery()
	}


