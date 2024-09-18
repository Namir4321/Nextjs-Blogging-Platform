import UserCard from "@/components/Card/UserCard";
const Userlist = ({users}) => {
  return (
    <section className="mt-4 gap-4 container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <UserCard user={user} key={user.name} />
      ))}
    </section>
  );
}

export default Userlist