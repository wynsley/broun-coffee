import { Button } from "../../atoms/buttons"
import { Link } from "../../atoms/links"

function Buttons() {
  return (
    <div
      className="
        flex 
        flex-nowrap 
        justify-around
        gap-4
        mt-6 
        w-full
        no-scrollbar
      "
    >
      <Button
        variant="secondary"
        text={'Reservar'}
        type='submit'
        className="font-semibold cursor-pointer"

      />

      <Link
        href='#schedules'
        variant="button"
        text={'Ver Horarios'}
        className="font-semibold "
      />
    </div>
  )
}

export { Buttons }
