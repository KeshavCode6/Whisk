import { supabase } from "@/lib/supabase/supabase"
import EvilIcons from "@expo/vector-icons/EvilIcons"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useMemo, useState } from "react"
import { Alert } from "react-native"
import { Button, Input, Text, View } from "tamagui"

export default function Auth() {
    const { mode } = useLocalSearchParams<{
        mode?: "signin" | "signup"
    }>()

    const isSignup = useMemo(() => mode === "signup", [mode])

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    async function signInWithEmail() {
        if (!supabase) {
            Alert.alert(
                "Missing Supabase config",
                "Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in your env."
            )
            return
        }

        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        setLoading(false)
        if (error) Alert.alert(error.message)
    }

    async function signUpWithEmail() {
        if (!supabase) {
            Alert.alert(
                "Missing Supabase config",
                "Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in your env."
            )
            return
        }

        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email,
            password,
        })

        setLoading(false)

        if (error) {
            Alert.alert(error.message)
            return
        }

        if (!session) {
            Alert.alert("Check your inbox", "Please verify your email to continue.")
        }

    }

    const submit = isSignup ? signUpWithEmail : signInWithEmail

    useEffect(() => {
        if (!supabase) return

        supabase.auth.getSession().then(({ data }) => {
            if (data.session) {
                router.replace("/(tabs)/dashboard")
            }
        })

        const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" && session) {
                router.replace("/(tabs)/dashboard")
            }
        })

        return () => {
            sub.subscription.unsubscribe()
        }
    }, [router])

    return (
        <View justify="center" grow={1} px="$10">
            <View gap="$3" width="100%">
                <Text fontSize="$8" fontWeight="700" mb="$2">
                    {isSignup ? "Create account" : "Welcome back"}
                </Text>

                <Input
                    size="$4"
                    borderWidth={2}
                    width="100%"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    background="$background"
                    placeholderTextColor="$black"
                />

                <Input
                    size="$4"
                    borderWidth={2}
                    width="100%"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="$black"
                    textContentType="password"
                    background="$background"
                />

                <Button
                    width="100%"
                    justify="space-between"
                    size="$4"
                    variant="outlined"
                    onPress={submit}
                    disabled={loading}
                >
                    {loading ? "Loading..." : isSignup ? "Sign up" : "Sign in"}
                    <EvilIcons name="chevron-right" size={24} color="black" />
                </Button>

                {/* Optional: show params (for debugging) */}
                {/* <Text mt="$2" opacity={0.6}>
          mode={String(mode)} redirectTo={String(redirectTo)}
        </Text> */}
            </View>
        </View>
    )
}
