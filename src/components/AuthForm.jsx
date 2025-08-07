import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

function AuthForm({ onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (isRegistering) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      const userId = data?.user?.id || data?.session?.user?.id;

      if (userId && fullName) {
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert([{ id: userId, name: fullName, email }], {
            onConflict: ["id"],
          });

        if (profileError) {
          console.error("Error inserting profile:", profileError);
        }
      }

      alert("Check your email to confirm registration!");
    }
  } else {
    // ✅ Add this missing sign-in logic
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      if (onAuthSuccess) onAuthSuccess();
    }
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegistering ? "Register" : "Sign In"}
        </h2>

        {isRegistering && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {isRegistering ? "Create Account" : "Sign In"}
        </button>

        <p className="mt-4 text-sm text-center">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-600 hover:underline"
          >
            {isRegistering ? "Sign In" : "Register"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default AuthForm;
