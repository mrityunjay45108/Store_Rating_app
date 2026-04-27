import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Anchor,
  Stack,
  Textarea,
  Group,
  Divider,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate, Link } from "react-router-dom";
import {
  IconUser,
  IconAt,
  IconLock,
  IconMapPin,
  IconUserPlus,
  IconArrowLeft,
  IconUsersGroup,
} from "@tabler/icons-react";

import api from "../services/api";
import {
  validateName,
  validatePassword,
  validateAddress,
} from "../utils/validations";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      address: "",
      role: "user",
    },

    validate: {
      name: validateName,
      address: validateAddress,
      password: validatePassword,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await api.post("/auth/register", values);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={500} my={40}>
      {/* Back to Landing Page Button */}
      <Button
        variant="light"
        color="gray"
        leftSection={<IconArrowLeft size={16} stroke={2.5} />}
        onClick={() => navigate("/")}
        mb="xl"
        radius="xl"
        size="xs"
        px="md"
        styles={{
          root: {
            border: "1px solid transparent",
            "&:hover": {
              border: "1px solid #e0e0e0",
              backgroundColor: "#f8f9fa",
            },
          },
        }}
      >
        Back to home
      </Button>

      <Paper withBorder shadow="xl" p={30} radius="lg">
        <Title ta="center" fw={900} order={2}>
          Create an Account
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5} mb={30}>
          Join our community and start rating stores
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Full Name"
              placeholder="Min 20 - Max 60 characters"
              required
              leftSection={<IconUser size={16} />}
              {...form.getInputProps("name")}
              radius="md"
            />

            <TextInput
              label="Email"
              placeholder="you@email.com"
              required
              leftSection={<IconAt size={16} />}
              {...form.getInputProps("email")}
              radius="md"
            />

            <Select
              label="Register as"
              placeholder="Choose your role"
              required
              leftSection={<IconUsersGroup size={16} />}
              data={[
                { value: "user", label: "Normal User" },
                { value: "store_owner", label: "Store Owner" },
                // { value: 'system_administrator', label: 'System Administrator' },
              ]}
              {...form.getInputProps("role")}
              radius="md"
            />

            <Textarea
              label="Address"
              placeholder="Max 400 characters"
              required
              minRows={3}
              // Textarea mein leftSection top pe align hota hai
              leftSectionProps={{
                style: { alignItems: "flex-start", paddingTop: "10px" },
              }}
              leftSection={<IconMapPin size={16} />}
              {...form.getInputProps("address")}
              radius="md"
            />

            <PasswordInput
              label="Password"
              placeholder="8-16 chars, Uppercase & Special"
              required
              leftSection={<IconLock size={16} />}
              {...form.getInputProps("password")}
              radius="md"
            />

            <Button
              fullWidth
              mt="xl"
              type="submit"
              size="md"
              radius="md"
              loading={loading}
              leftSection={<IconUserPlus size={18} />}
            >
              Create Account
            </Button>
          </Stack>
        </form>

        <Divider
          my="lg"
          label="Already have an account?"
          labelPosition="center"
        />

        <Group justify="center">
          <Text size="sm">
            Already a member?{" "}
            <Anchor component={Link} to="/login" fw={700}>
              Login here
            </Anchor>
          </Text>
        </Group>
      </Paper>
    </Container>
  );
}
