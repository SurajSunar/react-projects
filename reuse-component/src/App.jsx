import Button from "./components/ui/Button";

const App = () => {
  return (
    <div className="bg-gray-100 h-screen space-y-8">
      <div className="flex flex-col gap-y-4 justify-center items-center w-full">
        <h1 className="text-4xl font-bold">Large Buttons</h1>
        <div className="flex gap-6">
          <Button theme="primary" size="lg">
            Primary
          </Button>
          <Button theme="secondary" size="lg">
            secondary
          </Button>
          <Button theme="danger" size="lg">
            danger
          </Button>
          <Button theme="warning" size="lg">
            warning
          </Button>
          <Button theme="success" size="lg">
            success
          </Button>
          <Button theme="error" size="lg">
            error
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 justify-center items-center w-full">
        <h1 className="text-4xl font-bold">Medium Buttons</h1>
        <div className="flex gap-6">
          <Button theme="primary" size="md">
            primary
          </Button>
          <Button theme="secondary" size="md">
            secondary
          </Button>
          <Button theme="danger" size="md">
            danger
          </Button>
          <Button theme="warning" size="md">
            warning
          </Button>
          <Button theme="success" size="md">
            success
          </Button>
          <Button theme="error" size="md">
            error
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 justify-center items-center w-full">
        <h1 className="text-4xl font-bold">Small Buttons</h1>
        <div className="flex gap-6">
          <Button theme="primary" size="sm">
            primary
          </Button>
          <Button theme="secondary" size="sm">
            secondary
          </Button>
          <Button theme="danger" size="sm">
            danger
          </Button>
          <Button theme="warning" size="sm">
            warning
          </Button>
          <Button theme="success" size="sm">
            success
          </Button>
          <Button theme="error" size="sm">
            error
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-y-4 justify-center items-center w-full">
        <h1 className="text-4xl font-bold">Loading Buttons</h1>
        <div className="flex gap-6">
          <Button theme="primary" size="md" loading>
            primary
          </Button>
          <Button theme="secondary" size="md" loading>
            secondary
          </Button>
          <Button theme="danger" size="md" loading>
            danger
          </Button>
          <Button theme="warning" size="md" loading>
            warning
          </Button>
          <Button theme="success" size="md" loading>
            success
          </Button>
          <Button theme="error" size="md" loading>
            error
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-y-4 justify-center items-center w-full ">
        <h1 className="text-4xl font-bold">Usage of Button</h1>
        <div className="flex gap-6 flex-col w-1/2 rounded border border-gray-200 p-4">
          <div>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis delectus officia natus soluta, velit obcaecati nostrum amet non suscipit. Fugit deserunt quisquam expedita beatae voluptatibus porro consequuntur iusto aut sint?
          </div>
          <Button theme="secondary" size="md" loading classes={'w-fit'}>
            Read More ...
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
