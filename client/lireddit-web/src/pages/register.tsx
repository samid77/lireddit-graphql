import React from 'react'
import {Form, Formik} from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage, Box, Button } from '@chakra-ui/react';
import {Wrapper} from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from 'next/router';

interface registerProps {}


const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter();
    const [,register] = useRegisterMutation()
    return (
        <Wrapper variant='small'>
            <Formik 
                initialValues={{username: '', password:''}} 
                onSubmit={async (values,{setErrors}) => {
                    console.log(values)
                    const response = await register({username: values.username, password: values.password})
                    if(response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors))
                    } else if(response.data?.register.user) {
                        //worked
                        router.push('/');
                    }
                }}>
                {({values, handleChange, isSubmitting}) => (
                    <Form>
                        <InputField 
                            name="username"
                            placeholder='username'
                            label='Username'
                        />
                        <Box mt={4}>
                            <InputField 
                                name="password"
                                placeholder='password'
                                label='Password'
                                type='password'
                            />
                        </Box>
                        <Button 
                            mt={4} 
                            isLoading={isSubmitting} 
                            type='submit' 
                            colorScheme="teal">Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Register;