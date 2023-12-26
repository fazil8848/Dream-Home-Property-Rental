import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Textarea,
  Rating,
  Progress,
} from "@material-tailwind/react";
import { generateError } from "../../Dependencies/toast";
import {
  useAddReviewMutation,
  useGetReviewsMutation,
  usePropertyIncludedMutation,
} from "../../../Redux/Slices/userApi/usersApiSlice";
import { useSelector } from "react-redux";

const RatingsAndReview = ({ property }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [addReviewLoading, setAddReviewLoading] = useState(false);
  const [addReviewCall] = useAddReviewMutation();
  const [getPropertyReviewsCall] = useGetReviewsMutation();
  const { userInfo } = useSelector((state) => state.user);
  const user = userInfo?._id;
  const propertyId = property._id;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [checkUserBookedProperty] = usePropertyIncludedMutation();
  const [propertyBooked, setPropertyBooked] = useState(false);

  const formattedDate = (date) => {
    const fdate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return fdate;
  };

  const ratingStrings = {
    1: "Poor",
    2: "Headache",
    3: "Average",
    4: `Good`,
    5: "Excellent!   ",
  };

  const handleCheck = async () => {
    try {
      const result = await checkUserBookedProperty({ propertyId, user });
      if (result.error) {
        return generateError(result.error);
      } else {
        setPropertyBooked(result.propertyBooked);
      }
    } catch (error) {
      console.log(error);
      generateError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAddReviewLoading(true);
      if (rating < 1 || rating > 5)
        return generateError("Please Provide a Valid Rating");

      if (comment.trim() === "")
        return generateError("Please Provide a Valid comment");
      const result = await addReviewCall({
        rating,
        comment,
        user,
        propertyId,
      }).unwrap();
      if (result.error) {
        generateError(result.error);
      } else {
        setRating(0);
        setComment("");
        setReviews(result.reviews);
      }
    } catch (error) {
      generateError(error.message);
      console.log(error);
    } finally {
      setAddReviewLoading(false);
      handleOpen();
    }
  };

  useEffect(() => {
    const getPropertyReviews = async () => {
      const result = await getPropertyReviewsCall({ propertyId }).unwrap();
      if (result.error) {
        return generateError(result.error);
      } else {
        setReviews(result.reviews);
      }
    };
    getPropertyReviews();
  }, []);

  useEffect(() => {
    if (userInfo?._id) {
      handleCheck();
    }
  }, [userInfo]);

  return (
    <>
      <div className="border rounded-md md:w-9/12 mb-10 p-9 font-poppins">
        {reviews.length > 0 ? (
          <>
            <div className=" flex justify-between ">
              <Typography className=" text-black text-2xl font-poppins font-medium">
                Ratings And Reviews
              </Typography>

              {userInfo && (
                <Button
                  onClick={handleOpen}
                  className="bg-white text-black hover:text-white hover:bg-black border me-2"
                >
                  Add Review
                </Button>
              )}
            </div>
            <div className="p-10">
              {[5, 4, 3, 2, 1].map((val, i) => (
                <div className="p-2 items-center flex gap-4">
                  <Progress
                    variant="determinate"
                    value={val * 10}
                    className="w-full"
                  />
                  <Rating
                    name="read-only"
                    ratedColor="amber"
                    value={5 - i}
                    readonly
                  />
                </div>
              ))}
            </div>
            <div className="border rounded-md p-6 md:flex-col max-h-96 overflow-y-auto">
              {reviews.map((review, i) => (
                <div className="container w-full mb-6 p-6 border shadow-xl rounded-md">
                  <Typography className="font-semibold text-lg my-2">
                    Saapi
                  </Typography>
                  <div className=" flex gap-2 mb-2 ">
                    <div className="flex items-center gap-2 font-bold text-blue-gray-500">
                      {review.rating}
                      <Rating
                        ratedColor="amber"
                        value={review.rating}
                        readonly
                      />
                    </div>{" "}
                    {ratingStrings[review.rating] && (
                      <p className="font-poppins font-medium">
                        {ratingStrings[review.rating]}{" "}
                        {review.rating === 4 && <span>&#10003;</span>}{" "}
                      </p>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs ms-2 mb-5">
                    POSTED ON: {formattedDate(review.date)}
                  </p>

                  <p className="text-gray-500 text-base">{review.comment}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className=" flex justify-between ">
              <Typography className=" text-black text-2xl font-poppins font-medium">
                Ratings And Reviews
              </Typography>

              {userInfo && propertyBooked && (
                <Button
                  onClick={handleOpen}
                  className="bg-white text-black hover:text-white hover:bg-black border me-2"
                >
                  Add Review
                </Button>
              )}
            </div>
            <p> No Ratings as Of now</p>
          </>
        )}
      </div>

      {/* -------------------=== Modal ===------------------- */}
      <>
        <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          {addReviewLoading ? (
            <Card className="mx-auto w-full max-w-[24rem]">
              <div className=" mb-10 p-3  h-[45vh] flex items-center justify-center">
                <div className=" h-10">
                  <div className="animate-spin h-20 w-20">
                    <div className="h-full w-full border-4 border-t-blue-100 border-b-blue-100 rounded-[50%]"></div>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="mx-auto w-full max-w-[24rem]">
              <CardBody className="flex flex-col gap-4">
                <Typography className="text-black text-2xl font-medium font-poppins">
                  Add a comment
                </Typography>
                <Typography className="-mb-2" variant="h6">
                  Record Your Rating
                </Typography>
                <div className="w-full flex justify-center">
                  <Rating
                    value={rating}
                    ratedColor="amber"
                    onChange={(value) => setRating(value)}
                  />
                </div>

                <Typography className="-mb-2" variant="h6">
                  Your comment
                </Typography>
                <Textarea
                  onChange={(e) => setComment(e.target.value)}
                  label="Add your comment"
                  size="lg"
                />
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  variant="gradient"
                  className="text-black border"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </CardFooter>
            </Card>
          )}
        </Dialog>
      </>
    </>
  );
};

export default RatingsAndReview;
