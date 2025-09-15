import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

// material-ui
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    Link as MuiLink,
    Paper,
    TextField,
    Typography,
    useTheme
} from '@mui/material'

// project imports
import MainCard from '@/ui-component/cards/MainCard'
import { BackdropLoader } from '@/ui-component/loading/BackdropLoader'

// API
import authApi from '@/api/auth'
import accountApi from '@/api/account.api'
import loginMethodApi from '@/api/loginmethod'
import ssoApi from '@/api/sso'

// Hooks
import useApi from '@/hooks/useApi'
import { useConfig } from '@/store/context/ConfigContext'

// utils
import useNotifier from '@/utils/useNotifier'

// store
import { store } from '@/store'
import { loginSuccess } from '@/store/reducers/authSlice'

// Icons
import { IconCircleCheck, IconExclamationCircle } from '@tabler/icons-react'

// Assets
import netmobLogo from '@/assets/images/logo-netmob.png'

// ==============================|| Login2Page ||============================== //

// Schéma de validation Zod
const LoginSchema = z.object({
    email: z.string().min(1, 'L\'adresse e-mail est requise').email('Adresse e-mail invalide'),
    password: z.string().min(1, 'Le mot de passe est requis')
})

const Login2Page = () => {
    const theme = useTheme()
    useNotifier()
    const { isEnterpriseLicensed, isCloud, isOpenSource } = useConfig()
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    })

    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [authError, setAuthError] = useState('')
    const [successMsg, setSuccessMsg] = useState(undefined)
    const [configuredSsoProviders, setConfiguredSsoProviders] = useState([])

    // APIs
    const loginApi = useApi(authApi.login)
    const ssoLoginApi = useApi(ssoApi.ssoLogin)
    const getDefaultProvidersApi = useApi(loginMethodApi.getDefaultLoginMethods)

    // Éliminer les scrolls globaux
    useEffect(() => {
        // Sauvegarder les styles originaux
        const originalBodyOverflow = document.body.style.overflow
        const originalHtmlOverflow = document.documentElement.style.overflow
        const originalBodyMargin = document.body.style.margin
        const originalHtmlMargin = document.documentElement.style.margin
        
        // Appliquer les styles pour supprimer les scrolls
        document.body.style.overflow = 'hidden'
        document.documentElement.style.overflow = 'hidden'
        document.body.style.margin = '0'
        document.documentElement.style.margin = '0'
        
        // Cleanup function pour restaurer les styles originaux
        return () => {
            document.body.style.overflow = originalBodyOverflow
            document.documentElement.style.overflow = originalHtmlOverflow
            document.body.style.margin = originalBodyMargin
            document.documentElement.style.margin = originalHtmlMargin
        }
    }, [])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        
        // Effacer l'erreur du champ modifié
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setAuthError('')
        setErrors({})
        setLoading(true)

        // Validation avec Zod
        const result = LoginSchema.safeParse({
            email: formData.email,
            password: formData.password
        })
        
        if (!result.success) {
            const newErrors = {}
            result.error.errors.forEach((error) => {
                newErrors[error.path[0]] = error.message
            })
            setErrors(newErrors)
            setLoading(false)
            return
        }

        // Appel à l'API de connexion
        const loginData = {
            email: formData.email,
            password: formData.password
        }

        console.log('Sending login request:', loginData)
        loginApi.request(loginData)
    }

    const signInWithSSO = (ssoProvider) => {
        window.location.href = `/api/v1/${ssoProvider}/login`
    }

    // Effects pour gérer les réponses API
    useEffect(() => {
        if (loginApi.error) {
            console.error('Login API error:', loginApi.error)
            setLoading(false)
            
            if (loginApi.error.response?.status === 401 && loginApi.error.response?.data?.redirectUrl) {
                window.location.href = loginApi.error.response.data.redirectUrl
            } else {
                setAuthError(loginApi.error.response?.data?.message || loginApi.error.message || 'Erreur lors de la connexion. Veuillez vérifier vos identifiants et réessayer.')
            }
        }
    }, [loginApi.error])

    useEffect(() => {
        if (!isOpenSource) {
            getDefaultProvidersApi.request()
        }
    }, [isOpenSource, getDefaultProvidersApi])

    useEffect(() => {
        if (ssoLoginApi.data) {
            store.dispatch(loginSuccess(ssoLoginApi.data))
            navigate('/chatflows')
        }
    }, [ssoLoginApi.data, navigate])

    useEffect(() => {
        if (ssoLoginApi.error) {
            if (ssoLoginApi.error?.response?.status === 401 && ssoLoginApi.error?.response?.data.redirectUrl) {
                window.location.href = ssoLoginApi.error.response.data.redirectUrl
            } else {
                setAuthError(ssoLoginApi.error.message)
            }
        }
    }, [ssoLoginApi.error])

    useEffect(() => {
        if (getDefaultProvidersApi.data && getDefaultProvidersApi.data.providers) {
            setConfiguredSsoProviders(getDefaultProvidersApi.data.providers.map((provider) => provider))
        }
    }, [getDefaultProvidersApi.data])

    useEffect(() => {
        if (loginApi.data) {
            console.log('Login successful:', loginApi.data)
            setLoading(false)
            setAuthError(undefined)
            setSuccessMsg('Connexion réussie ! Redirection en cours...')
            
            // Dispatch de l'action de connexion réussie
            store.dispatch(loginSuccess(loginApi.data))
            
            // Redirection vers la page principale
            setTimeout(() => {
                navigate('/chatflows')
            }, 1000)
        }
    }, [loginApi.data, navigate])

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f3f4f6',
                overflow: 'hidden',
                margin: 0,
                padding: 0,
                boxSizing: 'border-box'
            }}
        >
            <MainCard 
                maxWidth="md"
                sx={{
                    width: '100%',
                    maxWidth: '600px',
                    border: 'none',
                    boxShadow: 'none',
                    backgroundColor: 'transparent',
                    margin: 0,
                    padding: 0
                }}
            >
                {/* Header Section */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    {/* Logo */}
                    <Box sx={{ mb: 3 }}>
                        <img
                            alt="Netmob"
                            src={netmobLogo}
                            style={{
                                height: '60px',
                                width: 'auto',
                                margin: '0 auto',
                                objectFit: 'contain'
                            }}
                        />
                    </Box>
                    
                    {/* Title */}
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            color: '#111827', // text-gray-900
                            mb: 0
                        }}
                    >
                        Connectez-vous à votre compte
                    </Typography>
                </Box>

                {/* Error/Success Messages */}
                {authError && (
                    <Alert 
                        icon={<IconExclamationCircle />} 
                        variant='filled' 
                        severity='error'
                        sx={{ mb: 2, borderRadius: 1 }}
                    >
                        {authError}
                    </Alert>
                )}
                {successMsg && (
                    <Alert 
                        icon={<IconCircleCheck />} 
                        variant='filled' 
                        severity='success'
                        sx={{ mb: 2, borderRadius: 1 }}
                    >
                        {successMsg}
                    </Alert>
                )}

                {/* Main Form Card */}
                <Paper
                    elevation={1}
                    sx={{
                        p: 4,
                        borderRadius: 2,
                        backgroundColor: 'white',
                        width: '100%',
                        maxWidth: '100%',
                        boxSizing: 'border-box',
                        overflow: 'hidden',
                        margin: 0
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                component="label"
                                htmlFor="email"
                                sx={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: '#111827', // text-gray-900
                                    mb: 1
                                }}
                            >
                                Adresse e-mail
                            </Typography>
                            <TextField
                                id="email"
                                name="email"
                                type="text"
                                required
                                fullWidth
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 1,
                                        backgroundColor: 'white',
                                        '& fieldset': {
                                            borderColor: errors.email ? '#EF4444' : '#d1d5db' // border-red-500 ou border-gray-300
                                        },
                                        '&:hover fieldset': {
                                            borderColor: errors.email ? '#EF4444' : '#9ca3af' // border-red-500 ou hover:border-gray-400
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: errors.email ? '#EF4444' : '#4f46e5', // border-red-500 ou focus:border-indigo-600
                                            borderWidth: 2
                                        }
                                    },
                                    '& .MuiFormHelperText-root': {
                                        color: '#EF4444', // text-red-500
                                        fontSize: '0.75rem',
                                        marginTop: 0.5
                                    },
                                    '& .MuiInputBase-input': {
                                        py: 1.5,
                                        px: 1.5,
                                        fontSize: '0.875rem',
                                        color: '#111827' // text-gray-900
                                    }
                                }}
                            />
                        </Box>

                        {/* Password Field */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                component="label"
                                htmlFor="password"
                                sx={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: '#111827', // text-gray-900
                                    mb: 1
                                }}
                            >
                                Mot de passe
                            </Typography>
                            <TextField
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                fullWidth
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleInputChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                sx={{ color: '#6b7280' }}
                                            >
                                                {showPassword ? (
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                                        <line x1="1" y1="1" x2="23" y2="23"/>
                                                    </svg>
                                                ) : (
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                                        <circle cx="12" cy="12" r="3"/>
                                                    </svg>
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 1,
                                        backgroundColor: 'white',
                                        '& fieldset': {
                                            borderColor: errors.password ? '#EF4444' : '#d1d5db' // border-red-500 ou border-gray-300
                                        },
                                        '&:hover fieldset': {
                                            borderColor: errors.password ? '#EF4444' : '#9ca3af' // border-red-500 ou hover:border-gray-400
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: errors.password ? '#EF4444' : '#4f46e5', // border-red-500 ou focus:border-indigo-600
                                            borderWidth: 2
                                        }
                                    },
                                    '& .MuiFormHelperText-root': {
                                        color: '#EF4444', // text-red-500
                                        fontSize: '0.75rem',
                                        marginTop: 0.5
                                    },
                                    '& .MuiInputBase-input': {
                                        py: 1.5,
                                        px: 1.5,
                                        fontSize: '0.875rem',
                                        color: '#111827' // text-gray-900
                                    }
                                }}
                            />
                        </Box>

                        {/* Remember Me & Forgot Password */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                        sx={{
                                            color: '#4f46e5', // indigo-600
                                            '&.Mui-checked': {
                                                color: '#4f46e5'
                                            }
                                        }}
                                    />
                                }
                                label={
                                    <Typography sx={{ fontSize: '0.875rem', color: '#111827' }}>
                                        Se souvenir de moi
                                    </Typography>
                                }
                            />
                            <MuiLink
                                href="#"
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: '#4f46e5', // text-indigo-600
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: '#4338ca' // hover:text-indigo-500
                                    }
                                }}
                            >
                                Mot de passe oublié ?
                            </MuiLink>
                        </Box>

                        {/* Sign In Button */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                py: 2,
                                mb: 3,
                                borderRadius: 1,
                                backgroundColor: '#4f46e5', // bg-indigo-600
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                                '&:hover': {
                                    backgroundColor: '#4338ca' // hover:bg-indigo-500
                                },
                                '&:focus': {
                                    outline: '2px solid #4f46e5',
                                    outlineOffset: '2px'
                                }
                            }}
                        >
                            Se connecter
                        </Button>
                    </form>

                    {/* Divider */}
                    <Box sx={{ my: 3 }}>
                        <Divider sx={{ position: 'relative' }}>
                            <Typography
                                sx={{
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: 'white',
                                    px: 2,
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: '#111827', // text-gray-900
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Ou continuer avec
                            </Typography>
                        </Divider>
                    </Box>

                    {/* Social Login Buttons */}
                    {configuredSsoProviders.length > 0 && (
                        <Grid container spacing={2}>
                            {configuredSsoProviders.map((ssoProvider) => (
                                <Grid item xs={6} key={ssoProvider}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => signInWithSSO(ssoProvider)}
                                        startIcon={
                                            ssoProvider === 'google' ? (
                                                <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '20px', height: '20px' }}>
                                                    <path
                                                        d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                                        fill="#EA4335"
                                                    />
                                                    <path
                                                        d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                                        fill="#4285F4"
                                                    />
                                                    <path
                                                        d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                                        fill="#FBBC05"
                                                    />
                                                    <path
                                                        d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                                        fill="#34A853"
                                                    />
                                                </svg>
                                            ) : ssoProvider === 'github' ? (
                                                <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" style={{ width: '20px', height: '20px', fill: '#24292F' }}>
                                                    <path
                                                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                                        clipRule="evenodd"
                                                        fillRule="evenodd"
                                                    />
                                                </svg>
                                            ) : null
                                        }
                                        sx={{
                                            py: 1.5,
                                            borderRadius: 1,
                                            borderColor: '#d1d5db', // border-gray-300
                                            backgroundColor: 'white',
                                            color: '#111827', // text-gray-900
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                                            '&:hover': {
                                                backgroundColor: '#f9fafb', // hover:bg-gray-50
                                                borderColor: '#9ca3af'
                                            }
                                        }}
                                    >
                                        {ssoProvider === 'google' && 'Google'}
                                        {ssoProvider === 'azure' && 'Microsoft'}
                                        {ssoProvider === 'auth0' && 'Auth0'}
                                        {ssoProvider === 'github' && 'GitHub'}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Paper>

                {/* Footer */}
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        Pas encore membre ?{' '}
                        <MuiLink
                            component={Link}
                            to="/register2"
                            sx={{
                                fontWeight: 600,
                                color: '#4f46e5', // text-indigo-600
                                textDecoration: 'none',
                                '&:hover': {
                                    color: '#4338ca' // hover:text-indigo-500
                                }
                            }}
                        >
                           S'inscrire
                        </MuiLink>
                    </Typography>
                </Box>
            </MainCard>
            {loading && <BackdropLoader open={loading} />}
        </Box>
    )
}

export default Login2Page
