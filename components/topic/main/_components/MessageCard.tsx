export default function Message ({
    message,
    profile,
    setProfileCache,
  }: {
    message: Message
    profile?: Profile
    setProfileCache: Dispatch<SetStateAction<ProfileCache>>
  }) => {
    const userId = supabase.auth.user()?.id
  
    useEffect(() => {
      const fetchProfile = async () => {
        const { data } = await supabase
          .from<Profile>('profiles')
          .select('id, username')
          .match({ id: message.profile_id })
          .single()
  
        if (data) {
          setProfileCache((current) => ({
            ...current,
            [data.id]: data,
          }))
        }
      }
      if (!profile) {
        fetchProfile()
      }
    }, [profile, message.profile_id])
  
    return (
      <li
        key={message.id}
        className={
          message.profile_id === userId
            ? 'self-end rounded bg-blue-400 px-2'
            : 'self-start rounded bg-gray-100 px-2'
        }
      >
        <span className="block text-xs text-gray-500">
          {profile?.username ?? 'Loading...'}
        </span>
        <span className="">{message.content}</span>
      </li>
    )
  }
  