import Image from "next/image";
import { uploadImage, getImages } from "./actions";

export default async function Home() {
  const images = await getImages();

  return (
    <main className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-6">Image Upload & Preview</h1>

      <section className="mb-8 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Upload New Image</h2>
        <form action={uploadImage} className="flex flex-col gap-4 max-w-sm">
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Upload
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Uploaded Images</h2>
        {images.length === 0 ? (
          <p className="text-gray-500">No images uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {images.map((image) => (
              <div key={image} className="flex flex-col gap-2">
                <div className="relative aspect-square border rounded overflow-hidden">
                  <Image
                    src={`/uploads/${image}`}
                    alt={image}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs truncate text-gray-600" title={image}>
                  {image}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
