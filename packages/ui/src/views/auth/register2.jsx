import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
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
import accountApi from '@/api/account.api'
import loginMethodApi from '@/api/loginmethod'
import ssoApi from '@/api/sso'

// Hooks
import useApi from '@/hooks/useApi'
import { useConfig } from '@/store/context/ConfigContext'

// utils
import useNotifier from '@/utils/useNotifier'
import { passwordSchema } from '@/utils/validation'

// store
import { store } from '@/store'
import { loginSuccess } from '@/store/reducers/authSlice'

// Icons
import { IconCircleCheck, IconExclamationCircle, IconEye, IconEyeOff } from '@tabler/icons-react'

// Assets
import netmobLogo from '@/assets/images/logo-netmob.png'

// ==============================|| Register2Page ||============================== //

// IMPORTANT: when updating this schema, update the schema on the server as well
// packages/server/src/enterprise/Interface.Enterprise.ts
const RegisterEnterpriseUserSchema = z
    .object({
        username: z.string().min(1, 'Le nom complet est requis'),
        email: z.string().min(1, 'L\'adresse e-mail est requise').email('Adresse e-mail invalide'),
        password: passwordSchema,
        confirmPassword: z.string().min(1, 'La confirmation du mot de passe est requise'),
        token: z.string().min(1, 'Le code d\'invitation est requis')
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Les mots de passe ne correspondent pas",
        path: ['confirmPassword']
    })

const RegisterCloudUserSchema = z
    .object({
        username: z.string().min(1, 'Le nom complet est requis'),
        email: z.string().min(1, 'L\'adresse e-mail est requise').email('Adresse e-mail invalide'),
        password: passwordSchema,
        confirmPassword: z.string().min(1, 'La confirmation du mot de passe est requise')
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Les mots de passe ne correspondent pas",
        path: ['confirmPassword']
    })

const Register2Page = () => {
    const theme = useTheme()
    useNotifier()
    const { isEnterpriseLicensed, isCloud, isOpenSource } = useConfig()
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        token: params.get('token') ?? '',
        acceptTerms: false
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [loading, setLoading] = useState(false)
    const [authError, setAuthError] = useState('')
    const [successMsg, setSuccessMsg] = useState(undefined)
    const [configuredSsoProviders, setConfiguredSsoProviders] = useState([])
    const [errors, setErrors] = useState({})

    const registerApi = useApi(accountApi.registerAccount)
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

        console.log('Form submitted with data:', formData)
        console.log('isEnterpriseLicensed:', isEnterpriseLicensed, 'isCloud:', isCloud, 'isOpenSource:', isOpenSource)

        try {
            // Validation des conditions d'utilisation
            if (!formData.acceptTerms) {
                setErrors({ acceptTerms: 'Vous devez accepter les conditions d\'utilisation' })
                setLoading(false)
                return
            }

            let validationResult = null
            let requestBody = null

            if (isEnterpriseLicensed) {
                validationResult = RegisterEnterpriseUserSchema.safeParse({
                    username: formData.username,
                    email: formData.email,
                    token: formData.token,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                })
                
                if (validationResult.success) {
                    requestBody = {
                        user: {
                            name: formData.username,
                            email: formData.email,
                            credential: formData.password,
                            tempToken: formData.token
                        }
                    }
                }
            } else {
                // Pour Cloud et OpenSource
                validationResult = RegisterCloudUserSchema.safeParse({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                })
                
                if (validationResult.success) {
                    requestBody = {
                        user: {
                            name: formData.username,
                            email: formData.email,
                            credential: formData.password
                        }
                    }
                }
            }

            // Si la validation échoue, afficher les erreurs
            if (!validationResult.success) {
                const newErrors = {}
                validationResult.error.errors.forEach((error) => {
                    newErrors[error.path[0]] = error.message
                })
                setErrors(newErrors)
                setLoading(false)
                return
            }

            // Appel à l'API d'inscription
            console.log('Sending registration request:', requestBody)
            const response = await registerApi.request(requestBody)
            console.log('Registration response:', response)

        } catch (error) {
            console.error('Registration error:', error)
            setLoading(false)
            
            // Gestion des erreurs spécifiques
            if (error.response?.data?.message) {
                setAuthError(error.response.data.message)
            } else if (error.message) {
                setAuthError(error.message)
            } else {
                setAuthError('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.')
            }
        }
    }

    const signInWithSSO = (ssoProvider) => {
        window.location.href = `/api/v1/${ssoProvider}/login`
    }

    // Effects pour gérer les réponses API
    useEffect(() => {
        if (registerApi.error) {
            console.error('Registration API error:', registerApi.error)
            setLoading(false)
            
            if (isEnterpriseLicensed) {
                setAuthError(
                    `Erreur lors de l'inscription. Veuillez contacter votre administrateur. (${registerApi.error?.response?.data?.message || registerApi.error.message})`
                )
            } else if (isCloud) {
                setAuthError(`Erreur lors de l'inscription. Veuillez réessayer.`)
            } else {
                setAuthError(`Erreur lors de l'inscription. Veuillez réessayer.`)
            }
        }
    }, [registerApi.error, isEnterpriseLicensed, isCloud])

    useEffect(() => {
        if (!isOpenSource) {
            getDefaultProvidersApi.request()
        }
    }, [isOpenSource, getDefaultProvidersApi])

    useEffect(() => {
        if (ssoLoginApi.data) {
            store.dispatch(loginSuccess(ssoLoginApi.data))
            navigate(location.state?.path || '/chatflows')
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
        if (registerApi.data) {
            console.log('Registration successful:', registerApi.data)
            setLoading(false)
            setAuthError(undefined)
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                token: '',
                acceptTerms: false
            })
            
            if (isEnterpriseLicensed) {
                setSuccessMsg('Inscription réussie. Vous allez être redirigé vers la page de connexion dans quelques instants.')
            } else if (isCloud) {
                setSuccessMsg('Pour finaliser votre inscription, veuillez cliquer sur le lien de vérification que nous avons envoyé à votre adresse e-mail.')
            } else {
                setSuccessMsg('Inscription réussie. Vous allez être redirigé vers la page de connexion dans quelques instants.')
            }
            
            setTimeout(() => {
                navigate('/login2')
            }, 3000)
        }
    }, [registerApi.data, isEnterpriseLicensed, isCloud, navigate])

    return (
        <>
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
                                color: '#111827',
                                mb: 0
                            }}
                        >
                            Créer un compte
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
                            {/* Full Name Field */}
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    component="label"
                                    htmlFor="username"
                                    sx={{
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        color: '#111827',
                                        mb: 1
                                    }}
                                >
                                    Nom complet
                                </Typography>
                                <TextField
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    fullWidth
                                    placeholder="Jean Dupont"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    error={!!errors.username}
                                    helperText={errors.username}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 1,
                                            backgroundColor: 'white',
                                            '& fieldset': {
                                                borderColor: errors.username ? '#EF4444' : '#d1d5db'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: errors.username ? '#EF4444' : '#9ca3af'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: errors.username ? '#EF4444' : '#4f46e5',
                                                borderWidth: 2
                                            }
                                        },
                                        '& .MuiFormHelperText-root': {
                                            color: '#EF4444',
                                            fontSize: '0.75rem',
                                            marginTop: 0.5
                                        },
                                        '& .MuiInputBase-input': {
                                            py: 1.5,
                                            px: 1.5,
                                            fontSize: '0.875rem',
                                            color: '#111827'
                                        }
                                    }}
                                />
                            </Box>

                            {/* Email Field */}
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    component="label"
                                    htmlFor="email"
                                    sx={{
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        color: '#111827',
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
                                    placeholder="jean@exemple.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 1,
                                            backgroundColor: 'white',
                                            '& fieldset': {
                                                borderColor: errors.email ? '#EF4444' : '#d1d5db'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: errors.email ? '#EF4444' : '#9ca3af'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: errors.email ? '#EF4444' : '#4f46e5',
                                                borderWidth: 2
                                            }
                                        },
                                        '& .MuiFormHelperText-root': {
                                            color: '#EF4444',
                                            fontSize: '0.75rem',
                                            marginTop: 0.5
                                        },
                                        '& .MuiInputBase-input': {
                                            py: 1.5,
                                            px: 1.5,
                                            fontSize: '0.875rem',
                                            color: '#111827'
                                        }
                                    }}
                                />
                            </Box>

                            {/* Invite Code Field (Enterprise only) */}
                            {isEnterpriseLicensed && (
                                <Box sx={{ mb: 3 }}>
                                    <Typography
                                        component="label"
                                        htmlFor="token"
                                        sx={{
                                            display: 'block',
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                            color: '#111827',
                                            mb: 1
                                        }}
                                    >
                                        Code d'invitation
                                    </Typography>
                                    <TextField
                                        id="token"
                                        name="token"
                                        type="text"
                                        required
                                        fullWidth
                                        placeholder="Collez le code d'invitation"
                                        value={formData.token}
                                        onChange={handleInputChange}
                                        error={!!errors.token}
                                        helperText={errors.token}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 1,
                                                backgroundColor: 'white',
                                                '& fieldset': {
                                                    borderColor: errors.token ? '#EF4444' : '#d1d5db'
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: errors.token ? '#EF4444' : '#9ca3af'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: errors.token ? '#EF4444' : '#4f46e5',
                                                    borderWidth: 2
                                                }
                                            },
                                            '& .MuiFormHelperText-root': {
                                                color: '#EF4444',
                                                fontSize: '0.75rem',
                                                marginTop: 0.5
                                            },
                                            '& .MuiInputBase-input': {
                                                py: 1.5,
                                                px: 1.5,
                                                fontSize: '0.875rem',
                                                color: '#111827'
                                            }
                                        }}
                                    />
                                </Box>
                            )}

                            {/* Password Field */}
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    component="label"
                                    htmlFor="password"
                                    sx={{
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        color: '#111827',
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
                                    autoComplete="new-password"
                                    placeholder="••••••••"
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
                                                    {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 1,
                                            backgroundColor: 'white',
                                            '& fieldset': {
                                                borderColor: errors.password ? '#EF4444' : '#d1d5db'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: errors.password ? '#EF4444' : '#9ca3af'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: errors.password ? '#EF4444' : '#4f46e5',
                                                borderWidth: 2
                                            }
                                        },
                                        '& .MuiFormHelperText-root': {
                                            color: '#EF4444',
                                            fontSize: '0.75rem',
                                            marginTop: 0.5
                                        },
                                        '& .MuiInputBase-input': {
                                            py: 1.5,
                                            px: 1.5,
                                            fontSize: '0.875rem',
                                            color: '#111827'
                                        }
                                    }}
                                />
                            </Box>

                            {/* Confirm Password Field */}
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    component="label"
                                    htmlFor="confirmPassword"
                                    sx={{
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        color: '#111827',
                                        mb: 1
                                    }}
                                >
                                    Confirmer le mot de passe
                                </Typography>
                                <TextField
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    required
                                    fullWidth
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle confirm password visibility"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    edge="end"
                                                    sx={{ color: '#6b7280' }}
                                                >
                                                    {showConfirmPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 1,
                                            backgroundColor: 'white',
                                            '& fieldset': {
                                                borderColor: errors.confirmPassword ? '#EF4444' : '#d1d5db'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: errors.confirmPassword ? '#EF4444' : '#9ca3af'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: errors.confirmPassword ? '#EF4444' : '#4f46e5',
                                                borderWidth: 2
                                            }
                                        },
                                        '& .MuiFormHelperText-root': {
                                            color: '#EF4444',
                                            fontSize: '0.75rem',
                                            marginTop: 0.5
                                        },
                                        '& .MuiInputBase-input': {
                                            py: 1.5,
                                            px: 1.5,
                                            fontSize: '0.875rem',
                                            color: '#111827'
                                        }
                                    }}
                                />
                            </Box>

                            {/* Terms and Conditions */}
                            <Box sx={{ mb: 3 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="acceptTerms"
                                            checked={formData.acceptTerms}
                                            onChange={handleInputChange}
                                            sx={{
                                                color: errors.acceptTerms ? '#EF4444' : '#4f46e5',
                                                '&.Mui-checked': {
                                                    color: errors.acceptTerms ? '#EF4444' : '#4f46e5'
                                                }
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography sx={{ fontSize: '0.875rem', color: '#111827' }}>
                                            J'accepte les{' '}
                                            <MuiLink
                                                href="#"
                                                sx={{
                                                    color: '#4f46e5',
                                                    textDecoration: 'none',
                                                    '&:hover': {
                                                        color: '#4338ca'
                                                    }
                                                }}
                                            >
                                                conditions d'utilisation
                                            </MuiLink>
                                        </Typography>
                                    }
                                />
                                {errors.acceptTerms && (
                                    <Typography 
                                        sx={{ 
                                            color: '#EF4444', 
                                            fontSize: '0.75rem', 
                                            marginTop: 0.5,
                                            marginLeft: 4
                                        }}
                                    >
                                        {errors.acceptTerms}
                                    </Typography>
                                )}
                            </Box>

                            {/* Create Account Button */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    py: 2,
                                    mb: 3,
                                    borderRadius: 1,
                                    backgroundColor: '#4f46e5',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                                    '&:hover': {
                                        backgroundColor: '#4338ca'
                                    },
                                    '&:focus': {
                                        outline: '2px solid #4f46e5',
                                        outlineOffset: '2px'
                                    },
                                    '&:disabled': {
                                        backgroundColor: '#9ca3af',
                                        color: '#6b7280'
                                    }
                                }}
                            >
                                Créer un compte
                            </Button>
                        </form>

                        {/* Divider */}
                        {configuredSsoProviders.length > 0 && (
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
                                            color: '#111827',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        Ou continuer avec
                                    </Typography>
                                </Divider>
                            </Box>
                        )}

                        {/* Social Login Buttons */}
                        {configuredSsoProviders.length > 0 && (
                            <Grid container spacing={2}>
                                {configuredSsoProviders.map((ssoProvider) => (
                                    <Grid item xs={6} key={ssoProvider}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            onClick={() => signInWithSSO(ssoProvider)}
                                            sx={{
                                                py: 1.5,
                                                borderRadius: 1,
                                                borderColor: '#d1d5db',
                                                backgroundColor: 'white',
                                                color: '#111827',
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                                                '&:hover': {
                                                    backgroundColor: '#f9fafb',
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
                            Vous avez déjà un compte ?{' '}
                            <MuiLink
                                component={Link}
                                to="/login2"
                                sx={{
                                    fontWeight: 600,
                                    color: '#4f46e5',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: '#4338ca'
                                    }
                                }}
                            >
                                Se connecter
                            </MuiLink>
                        </Typography>
                    </Box>
                </MainCard>
            </Box>
            {loading && <BackdropLoader open={loading} />}
        </>
    )
}

export default Register2Page
