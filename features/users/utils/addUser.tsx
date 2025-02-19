import { toast } from "@/hooks/use-toast";
import { ERROR_MESSAGES } from "@/utils/errorMessage";
import { AddUserForm } from "../data/schema";

export const addUser = async (values: AddUserForm) => {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();
  if (!response.ok) {
    if (response.status === 409) {
      toast({
        title: "Conflict",
        description: data.message || ERROR_MESSAGES.USERNAME_EMAIL_EXISTS,
      });
    } else {
      throw new Error(data.message || ERROR_MESSAGES.CREATE_FAILED);
    }
    return null;
  }

  toast({
    title: "User added successfully!",
    description: "A new user has been successfully added.",
  });

  return data;
};
