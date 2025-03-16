import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface HomeCardProps {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  link: string;
  children?: ReactNode;
}

const HomeCard: FC<HomeCardProps> = ({
  children,
  title,
  subtitle,
  icon,
  link,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      className="min-w-[200px] max-w-[400px] flex flex-col items-center justify-center"
      isPressable
      onPress={() => navigate(link)}
      title="View details"
    >
      <CardHeader className="flex gap-3">
        {icon}
        <div className="flex flex-col items-start">
          <p className="text-md">{title}</p>
          {subtitle && (
            <p className="text-small text-default-500">{subtitle}</p>
          )}
        </div>
      </CardHeader>
      <Divider className="w-[90%]" />
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default HomeCard;
